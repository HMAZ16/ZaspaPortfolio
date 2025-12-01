// api.js
document.addEventListener("DOMContentLoaded", () => {
  const gradeStatus = document.getElementById("grade-status");
  const gradeResult = document.getElementById("grade-result");
  const gId = document.getElementById("g-id");
  const gLn = document.getElementById("g-ln");
  const gMid = document.getElementById("g-mid");
  const gFin = document.getElementById("g-fin");

  const lastName = "Zaspa";
  const id = "2340020";

  const apiUrl =
    "https://corsproxy.io/?http://class-grades-cs.mywebcommunity.org/grades_api.php?id=" +
    id +
    "&lastName=" +
    lastName;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Network error: " + response.status);
      return response.text();
    })
    .then((data) => {
      console.log("RAW XML:", data);

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");

      const student = xmlDoc.querySelector("student");

      if (!student) {
        gradeStatus.textContent = "Grade data not found.";
        return;
      }

      const xmlId = student.querySelector("student_id")?.textContent?.trim();
      const xmlLast = student.querySelector("student_lastname")?.textContent?.trim();
      const xmlMid = student.querySelector("midterm_grade")?.textContent?.trim();
      const xmlFin = student.querySelector("final_grade")?.textContent?.trim();

      gId.textContent = xmlId || "N/A";
      gLn.textContent = xmlLast || "N/A";
      gMid.textContent = xmlMid || "N/A";
      gFin.textContent = xmlFin || "N/A";

      gradeStatus.hidden = true;
      gradeResult.hidden = false;
    })
    .catch((error) => {
      console.error("Error:", error);
      gradeStatus.textContent = "Error fetching grade.";
    });
});
