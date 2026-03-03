// ====== SUPABASE SETTINGS (PASTE YOUR VALUES) ======
const SUPABASE_URL = https://twqxxqsjcakcrtsupwfe.supabase.co
const SUPABASE_ANON_KEY = "PASTE_SUPABASE_ANON_PUBLIC_KEY_HERE";

function fileNames(inputEl) {
  if (!inputEl || !inputEl.files) return [];
  return Array.from(inputEl.files).map(f => f.name);
}

async function supabaseInsertApplication(payload) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Prefer": "return=minimal"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || "Failed to save application to database.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("driverForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      app_id: "APP-" + Date.now(),
      status: "New",
      full_name: form.fullName?.value?.trim() || "",
      phone: form.phone?.value?.trim() || "",
      email: form.email?.value?.trim() || "",
      address: form.address?.value?.trim() || "",
      cdl_number: form.cdlNumber?.value?.trim() || "",
      cdl_state: form.cdlState?.value?.trim() || "",
      cdl_exp: form.cdlExp?.value || null,
      med_card_exp: form.medCard?.value || null,
      uploads: {
        cdl: fileNames(form.querySelector('input[name="uploadCDL"]')),
        med: fileNames(form.querySelector('input[name="uploadMedical"]')),
      },
      submitted_at: new Date().toISOString()
    };

    try {
      await supabaseInsertApplication(payload);
      alert("Submitted! MitchPath received your application.");
      form.reset();
      window.location.href = "dashboard.html";
    } catch (err) {
      alert("Submission failed: " + err.message);
    }
  });
});

