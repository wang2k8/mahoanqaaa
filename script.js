function createEmojiMapping() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const emojis = [
        "🦈", "🐂", "🦉", "🐐", "🐸", "👽", "🐔", "🐅", 
        "🐦", "🤡", "🐵", "🦋", "👻", "🐍", "🤮", "🦁", 
        "🗿", "🐢", "🪱", "🦐", "🫶", "🐘", "😘", "🙅‍♀️", 
        "🥵", "🥶", "k", "l", "m", "n", "o", "p", 
        "q", "r", "s", "t", "u", "v", "w", "x", 
        "y", "z"
    ];

    let mapping = {};
    for (let i = 0; i < letters.length; i++) {
        mapping[letters[i]] = emojis[i];
    }
    return mapping;
}

function createReverseMapping() {
    const emojiMapping = createEmojiMapping();
    let reverseMapping = {};
    for (let key in emojiMapping) {
        reverseMapping[emojiMapping[key]] = key; // Đổi ánh xạ
    }
    return reverseMapping;
}

function encryptText() {
    const emojiMapping = createEmojiMapping();
    const inputText = document.getElementById("inputText").value;
    let encryptedText = "";

    for (let char of inputText) {
        const lowerChar = char.toLowerCase();
        if (emojiMapping[lowerChar]) {
            encryptedText += emojiMapping[lowerChar];
        } else {
            encryptedText += char; // Giữ nguyên ký tự không phải chữ cái
        }
    }

    document.getElementById("encryptedText").innerText = encryptedText;
}

function decryptText() {
    const reverseMapping = createReverseMapping();
    const inputText = document.getElementById("encryptedText").innerText;
    let decryptedText = "";

    for (let char of inputText) {
        if (reverseMapping[char]) {
            decryptedText += reverseMapping[char];
        } else {
            decryptedText += char; // Giữ nguyên ký tự không phải emoji
        }
    }

    document.getElementById("encryptedText").innerText = decryptedText;
}

function copyToClipboard() {
    const textToCopy = document.getElementById("encryptedText").innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Đã sao chép vào clipboard!");
    });
}

function pasteFromClipboard() {
    navigator.clipboard.readText().then(text => {
        document.getElementById("inputText").value += text; // Dán vào textarea
    });
}

function clearInput() {
    document.getElementById("inputText").value = ""; // Xóa văn bản trong textarea
    document.getElementById("encryptedText").innerText = ""; // Xóa văn bản đã mã hóa
}

function addToInput(character) {
    document.getElementById("inputText").value += character; // Thêm ký tự vào textarea
}

function deleteLastCharacter() {
    const inputField = document.getElementById("inputText");
    inputField.value = inputField.value.slice(0, -1); // Xóa ký tự cuối cùng
}
