function includeHTML(selector, file) {
    fetch(file)
        .then(res => {
            if (!res.ok) throw new Error(`파일 로드 실패: ${file}`);
            return res.text();
        })
        .then(data => {
            document.querySelector(selector).innerHTML = data;
        })
        .catch(err => console.error(err));
}
