// api.js
document.addEventListener("DOMContentLoaded", () => {
  const gradeStatus = document.getElementById("grade-status");
  const gradeResult = document.getElementById("grade-result");
  const gId = document.getElementById("g-id");
  const gLn = document.getElementById("g-ln");
  const gMid = document.getElementById("g-mid");
  const gFin = document.getElementById("g-fin");

  const surname = "zaspa";
  const idNumber = "2340020";

  const apiUrl = `https://corsproxy.io/?http://class-grades-cs.mywebcommunity.org/grades_api.php?surname=${surname}&id_number=${idNumber}`;

  // Fetch the XML data
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Network error: " + response.status);
      return response.text();
    })
    .then((data) => {
      console.log("Response:", data); // for debugging
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");

      const students = Array.from(xmlDoc.getElementsByTagName("student"));
      const student = students.find(
        (s) =>
          s.getElementsByTagName("student_id")[0]?.textContent?.trim() === idNumber
      );

      if (!student) {
        gradeStatus.textContent = "Student not found.";
        return;
      }

      const lastName =
        student.getElementsByTagName("surname")[0]?.textContent?.trim() || "N/A";
      const midterm =
        student.getElementsByTagName("midterm_grade")[0]?.textContent?.trim() ||
        "N/A";
      const finalGrade =
        student.getElementsByTagName("final_grade")[0]?.textContent?.trim() ||
        "N/A";

      // Display results
      gId.textContent = idNumber;
      gLn.textContent = lastName;
      gMid.textContent = midterm;
      gFin.textContent = finalGrade;

      gradeStatus.hidden = true;
      gradeResult.hidden = false;
    })
    .catch((error) => {
      console.error("Error fetching grades:", error);
      gradeStatus.textContent = "Error fetching grade. Please try again later.";
    });
});
