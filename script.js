const passwordField = document.getElementById("password");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const strength = document.getElementById("strength");

lengthInput.addEventListener("input", () => {
    lengthValue.textContent = lengthInput.value;
});

function secureRandom(max) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
}

function generatePassword() {
    let chars = "";

    if (uppercase.checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase.checked) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers.checked) chars += "0123456789";
    if (symbols.checked) chars += "!@#$%&*()-_=+[]{}<>?/";

    if (!chars) {
        alert("Selecione pelo menos uma opção.");
        return;
    }

    let password = "";

    for (let i = 0; i < lengthInput.value; i++) {
        password += chars[secureRandom(chars.length)];
    }

    passwordField.value = password;
    evaluateStrength(password);
}

function evaluateStrength(password) {
    let score = 0;

    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
        strength.textContent = "Força: Fraca";
        strength.style.color = "red";
    } else if (score <= 4) {
        strength.textContent = "Força: Média";
        strength.style.color = "orange";
    } else {
        strength.textContent = "Força: Forte";
        strength.style.color = "lime";
    }
}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", async () => {
    if (!passwordField.value) return;

    await navigator.clipboard.writeText(passwordField.value);
    alert("Senha copiada!");
});

generatePassword();