
test('should delete user information', async () => {
    const data = await fetch("http://localhost:3000/api/user/1", {
        "method" : "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    expect(data.status).toBe(200);
});


test('should catch error related to "id doest not exists"', async () => {
    const data = await fetch("http://localhost:3000/api/user/1", {
        "method" : "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    expect(data.status).toBe(400);
});


test('should multiple user informaton', async () => {
    const data = await fetch("http://localhost:3000/api/user?id=[1,2]", {
        "method" : "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    expect(data.status).toBe(200);
});


