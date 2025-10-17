fetch('https://corsproxy.io/?http://class-grades-cs.mywebcommunity.org/grades_api.php?surname=zaspa&id_number=2340020')
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'text/xml');
    const student = Array.from(xmlDoc.getElementsByTagName('student'))
      .find(s => s.getElementsByTagName('student_id')[0]?.textContent?.trim() === '2340020');

    if (student) {
      const midterm = student.getElementsByTagName('midterm_grade')[0]?.textContent?.trim() || 'N/A';
      const finalG = student.getElementsByTagName('final_grade')[0]?.textContent?.trim() || 'N/A';
      document.getElementById('midterm-grade').textContent = `Midterm: ${midterm}`;
      document.getElementById('final-grade').textContent = `Final: ${finalG}`;
    } else {
      document.getElementById('midterm-grade').textContent = 'Midterm: Not found';
      document.getElementById('final-grade').textContent = 'Final: Not found';
    }
  })
  .catch(error => {
    console.error('Error fetching grades:', error);
    document.getElementById('midterm-grade').textContent = 'Midterm: Error';
    document.getElementById('final-grade').textContent = 'Final: Error';
  });
