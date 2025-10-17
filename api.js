// Fetch Midterm Grade using Fetch API with corsproxy.io
fetch('https://corsproxy.io/?' + encodeURIComponent('http://class-grades-cs.mywebcommunity.org/grades_api.php?surname=zaspa&id_number=2340020'))
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.text();
})
.then(data => {
    console.log('Response:', data);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'text/xml');
    
    // Find the student with matching ID
    const students = xmlDoc.getElementsByTagName('student');
    for (let student of students) {
        const studentId = student.getElementsByTagName('student_id')[0]?.textContent;
        if (studentId === '2340020') {
            const midtermGrade = student.getElementsByTagName('midterm_grade')[0]?.textContent || 'N/A';
            document.getElementById('midterm-grade').textContent = "Midterm: " + midtermGrade;
            break;
        }
    }
})
.catch(error => {
    console.error('Error fetching midterm grade:', error);
    document.getElementById('midterm-grade').textContent = 'Midterm: Error';
});

// Fetch Final Grade using XMLHttpRequest with corsproxy.io
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://corsproxy.io/?' + encodeURIComponent('http://class-grades-cs.mywebcommunity.org/grades_api.php?surname=zaspa&id_number=2340020'), true);

xhr.onload = function() {
    if (xhr.status === 200) {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xhr.responseText, 'text/xml');
            
            // Find the student with matching ID
            const students = xmlDoc.getElementsByTagName('student');
            for (let student of students) {
                const studentId = student.getElementsByTagName('student_id')[0]?.textContent;
                if (studentId === '2340020') {
                    const finalGrade = student.getElementsByTagName('final_grade')[0]?.textContent || 'N/A';
                    document.getElementById('final-grade').textContent = "Final: " + finalGrade;
                    break;
                }
            }
        } catch (error) {
            console.error('Error parsing final grade:', error);
            document.getElementById('final-grade').textContent = 'Final: Error';
        }
    } else {
        console.error('XHR Status:', xhr.status);
        document.getElementById('final-grade').textContent = 'Final: Error';
    }
};

xhr.onerror = function() {
    console.error('XHR Request failed');
    document.getElementById('final-grade').textContent = 'Final: Error';
};

xhr.send();


