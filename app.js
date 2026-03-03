// MitchPath CDL App Storage (local)
const STORAGE_KEY = "mitchpath_cdl_applications_v1";

function getApps() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveApps(apps) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

function fileNames(inputEl) {
  if (!inputEl || !inputEl.files) return [];
  return Array.from(inputEl.files).map((f) => f.name);
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("driverForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect form fields
    const data = {
      id: "APP-" + Date.now(),
      status: "New",
      submittedAt: new Date().toISOString(),
      fullName: form.fullName?.value?.trim() || "",
      phone: form.phone?.value?.trim() || "",
      email: form.email?.value?.trim() || "",
      address: form.address?.value?.trim() || "",
      cdlNumber: form.cdlNumber?.value?.trim() || "",
      cdlState: form.cdlState?.value?.trim() || "",
      cdlExp: form.cdlExp?.value || "",
      medCard: form.medCard?.value || "",
      uploads: {
        cdl: fileNames(form.querySelector('input[name="uploadCDL"]')),
        med: fileNames(form.querySelector('input[name="uploadMedical"]')),
      },
    };

    // Save to dashboard list
    const apps = getApps();
    apps.unshift(data);
    saveApps(apps);

    alert("Submitted! Your application is now in the Hiring Dashboard.");

    // Optional: clear form
    form.reset();

    // Go to dashboard
    window.location.href = "dashboard.html";
  });
});