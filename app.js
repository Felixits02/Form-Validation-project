const form = document.getElementById("myForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");

// Password requirement elements
const reqLength = document.getElementById("req-length");
const reqLower = document.getElementById("req-lower");
const reqUpper = document.getElementById("req-upper");
const reqNumber = document.getElementById("req-number");
const reqSpecial = document.getElementById("req-special");

// Real-time password strength check
passwordInput.addEventListener("input", () => {
  const val = passwordInput.value;

  reqLength.classList.toggle("valid", val.length >= 8);
  reqLower.classList.toggle("valid", /[a-z]/.test(val));
  reqUpper.classList.toggle("valid", /[A-Z]/.test(val));
  reqNumber.classList.toggle("valid", /\d/.test(val));
  reqSpecial.classList.toggle("valid", /[@$!%*?&]/.test(val));
});

// Toggle password visibility
document.querySelectorAll(".toggle-password").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.target);
    if (target.type === "password") {
      target.type = "text";
      btn.textContent = "visibility_off";
    } else {
      target.type = "password";
      btn.textContent = "visibility";
    }
  });
});

// Form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateForm()) {
    alert("Successfully data!");

    // Reset form
    form.reset();

    // Clear validation styles
    document.querySelectorAll(".form-group").forEach((group) => {
      group.classList.remove("success", "error");
      const small = group.querySelector("small");
      if (small) small.innerText = "";
    });

    // Reset password requirements
    document.querySelectorAll(".password-requirements li").forEach((li) => {
      li.classList.remove("valid");
    });

    // Reset password visibility icons
    document.querySelectorAll(".toggle-password").forEach((btn) => {
      btn.textContent = "visibility";
    });
  }
});

function validateForm() {
  let isValid = true;

  // Name
  if (nameInput.value.trim() === "") {
    setError(nameInput, "Name is required");
    isValid = false;
  } else if (!/^[a-zA-Z\s]+$/.test(nameInput.value.trim())) {
    setError(nameInput, "Name must contain only letters");
    isValid = false;
  } else {
    setSuccess(nameInput);
  }

  // Email
  if (emailInput.value.trim() === "") {
    setError(emailInput, "Email is required");
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
    setError(emailInput, "Email is not valid");
    isValid = false;
  } else {
    setSuccess(emailInput);
  }

  // Phone
  if (phoneInput.value.trim() === "") {
    setError(phoneInput, "Phone number is required");
    isValid = false;
  } else if (!/^\d{10}$/.test(phoneInput.value.trim())) {
    setError(phoneInput, "Phone number must be 10 digits");
    isValid = false;
  } else {
    setSuccess(phoneInput);
  }

  // Password
  const passVal = passwordInput.value.trim();
  if (passVal === "") {
    setError(passwordInput, "Password is required");
    isValid = false;
  } else if (
    !(
      passVal.length >= 8 &&
      /[a-z]/.test(passVal) &&
      /[A-Z]/.test(passVal) &&
      /\d/.test(passVal) &&
      /[@$!%*?&]/.test(passVal)
    )
  ) {
    setError(passwordInput, "Password does not meet all requirements");
    isValid = false;
  } else {
    setSuccess(passwordInput);
  }

  //confirm
  if (confirmInput.value.trim() === "") {
    setError(confirmInput, " Confirm Password is required");
    isValid = false;
  } else if (confirmInput.value.trim() !== passwordInput.value.trim()) {
    setError(confirmInput, "Password does not match");
    isValid = false;
  } else {
    setSuccess(confirmInput);
  }
  return isValid;
}

function setError(input, message) {
  const formGroup = input.parentElement;
  formGroup.classList.remove("success");
  formGroup.classList.add("error");
  const small = formGroup.querySelector("small");
  if (small) small.innerText = message;
}
function setSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.classList.remove("error");
  formGroup.classList.add("success");
  const small = formGroup.querySelector("small");
  if (small) small.innerText = "Looks Good!";
}
