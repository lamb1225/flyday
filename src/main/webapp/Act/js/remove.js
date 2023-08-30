function onRemoveClick(id) {
    console.log(id);
    if (!confirm('確定刪除?')) {
        return;
    }
    fetch('remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({actno: id})
    })
        .then(resp => resp.json())
        .then(body => {
            if (body.successful) {
                location.reload();
            }
        });
}