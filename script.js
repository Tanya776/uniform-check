const MAX_CLASSES = 3;
let classCapacity = [0, 0, 0];  // 반 별 정원
let students = [];  // 학생 목록
let studentCountByClass = [0, 0, 0]; // 반 별 학생 수

// 반 별 정원 설정
function setClassCapacity() {
    classCapacity[0] = parseInt(document.getElementById('class1').value) || 0;
    classCapacity[1] = parseInt(document.getElementById('class2').value) || 0;
    classCapacity[2] = parseInt(document.getElementById('class3').value) || 0;

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

    // 학번에서 학년, 반 번호, 학생 번호 추출
    const grade = Math.floor(studentID / 10000); // 학년 추출
    const classNum = Math.floor((studentID / 100) % 100); // 반 번호 추출

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