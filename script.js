// ── عند تحميل الصفحة ──
document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const gmailInput = document.getElementById("gmail");
  const passwordInput = document.getElementById("password");

  // ── إنشاء عناصر رسائل الخطأ تحت كل input ──
  function createErrorMsg(inputEl) {
    const span = document.createElement("span");
    span.classList.add("error-msg");
    span.style.display = "none";
    inputEl.insertAdjacentElement("afterend", span);
    return span;
  }

  const nameError     = createErrorMsg(nameInput);
  const ageError      = createErrorMsg(ageInput);
  const gmailError    = createErrorMsg(gmailInput);
  const passwordError = createErrorMsg(passwordInput);

  // ── دالة تعرض الخطأ ──
  function showError(input, errorEl, message) {
    errorEl.textContent = message;
    errorEl.style.display = "block";
    input.style.borderColor = "crimson";
  }

  // ── دالة تمسح الخطأ ──
  function clearError(input, errorEl) {
    errorEl.textContent = "";
    errorEl.style.display = "none";
    input.style.borderColor = "#00e5ff";
  }

  // ── Validation لكل حقل لوحده ──
  function validateName() {
    const val = nameInput.value.trim();
    if (val === "") {
      showError(nameInput, nameError, "❌ الاسم مطلوب");
      return false;
    } else if (val.length < 3) {
      showError(nameInput, nameError, "❌ الاسم لازم يكون 3 حروف على الأقل");
      return false;
    }
    clearError(nameInput, nameError);
    return true;
  }

  function validateAge() {
    const val = ageInput.value.trim();
    if (val === "") {
      showError(ageInput, ageError, "❌ العمر مطلوب");
      return false;
    } else if (val < 1 || val > 120) {
      showError(ageInput, ageError, "❌ ادخل عمر صحيح (1 - 120)");
      return false;
    }
    clearError(ageInput, ageError);
    return true;
  }

  function validateGmail() {
    const val = gmailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val === "") {
      showError(gmailInput, gmailError, "❌ الإيميل مطلوب");
      return false;
    } else if (!emailPattern.test(val)) {
      showError(gmailInput, gmailError, "❌ اكتب إيميل صحيح زي: example@gmail.com");
      return false;
    }
    clearError(gmailInput, gmailError);
    return true;
  }

  function validatePassword() {
    const val = passwordInput.value;
    if (val === "") {
      showError(passwordInput, passwordError, "❌ الباسورد مطلوب");
      return false;
    } else if (val.length < 6) {
      showError(passwordInput, passwordError, "❌ الباسورد لازم يكون 6 أحرف على الأقل");
      return false;
    }
    clearError(passwordInput, passwordError);
    return true;
  }

  // ── Validation فوري وأنت بتكتب ──
  nameInput.addEventListener("input", validateName);
  ageInput.addEventListener("input", validateAge);
  gmailInput.addEventListener("input", validateGmail);
  passwordInput.addEventListener("input", validatePassword);

  // ── عند الضغط على Submit ──
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isNameOk     = validateName();
    const isAgeOk      = validateAge();
    const isGmailOk    = validateGmail();
    const isPasswordOk = validatePassword();

    if (!isNameOk || !isAgeOk || !isGmailOk || !isPasswordOk) {
      return;
    }

    // ── حفظ في localStorage ──
    const userData = {
      name:     nameInput.value.trim(),
      age:      ageInput.value.trim(),
      gmail:    gmailInput.value.trim(),
      password: passwordInput.value,
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    alert("✅ تم التسجيل بنجاح يا " + userData.name + "! 🎉");
    form.reset();
  });

});