const MAX_CLASSES = 3;
let classCapacity = [0, 0, 0];
let students = []; 
let studentCountByClass = [0, 0, 0]; 

// 페이지 로드 시 정보 불러오기
window.onload = function() {
    loadFromLocalStorage();
};

// localStorage에서 데이터 로드
function loadFromLocalStorage() {
    const storedCapacity = JSON.parse(localStorage.getItem('classCapacity'));
    const storedStudents = JSON.parse(localStorage.getItem('students'));
    const storedCounts = JSON.parse(localStorage.getItem('studentCountByClass'));

    if (storedCapacity) {
        classCapacity = storedCapacity;
        document.getElementById('class1Capacity').textContent = classCapacity[0];
        document.getElementById('class2Capacity').textContent = classCapacity[1];
        document.getElementById('class3Capacity').textContent = classCapacity[2];
    }

    if (storedStudents) {
        students = storedStudents;
        for (let studentID of students) {
            const classNum = Math.floor((studentID / 100) % 100);
            if (classNum >= 1 && classNum <= MAX_CLASSES) {
                studentCountByClass[classNum - 1]++;
            }
        }
    }

    if (storedCounts) {
        studentCountByClass = storedCounts;
    }

    updateStats();
}

// 반 별 정원 설정
function setClassCapacity() {
    classCapacity[0] = parseInt(document.getElementById('class1').value) || 0;
    classCapacity[1] = parseInt(document.getElementById('class2').value) || 0;
    classCapacity[2] = parseInt(document.getElementById('class3').value) || 0;

    localStorage.setItem('classCapacity', JSON.stringify(classCapacity));
    document.getElementById('class1Capacity').textContent = classCapacity[0];
    document.getElementById('class2Capacity').textContent = classCapacity[1];
    document.getElementById('class3Capacity').textContent = classCapacity[2];

    updateStats();
}

// 학생 추가
function addStudent() {
    const studentID = parseInt(document.getElementById('studentID').value);

    if (!studentID) {
        alert("학번을 입력하세요.");
        return;
    }

    const classNum = Math.floor((studentID / 100) % 100);
    if (classNum < 1 || classNum > MAX_CLASSES) {
        alert("유효한 반 번호가 아닙니다.");
        return;
    }

    if (students.includes(studentID)) {
        alert("이미 등록된 학번입니다.");
        return;
    }

    students.push(studentID);
    studentCountByClass[classNum - 1]++;
    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('studentCountByClass', JSON.stringify(studentCountByClass));

    updateStats();
}

// 통계 업데이트
function updateStats() {
    for (let i = 0; i < MAX_CLASSES; i++) {
        const capacity = classCapacity[i];
        const count = studentCountByClass[i];
        const percentage = capacity > 0 ? (count / capacity * 100).toFixed(2) : 0;

        document.getElementById(`class${i + 1}Count`).textContent = count;
        document.getElementById(`class${i + 1}Percentage`).textContent = `${percentage}%`;
    }
}