
test('should display all user information', async () => {
    const data = await fetch("http://localhost:3000/api/user", {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    expect(data.status).toBe(200);
});


test('should display user id "1" information', async () => {
    const data = await fetch("http://localhost:3000/api/user/1", {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    expect(data.status).toBe(200);
});


test('should display information of user that is filtered by firstname "Mark Anthony" ', async () => {
    const data = await fetch('http://localhost:3000/api/user?where={"firstName" : "Mark Anthony"}', {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    expect(data.status).toBe(200);
});

test('should catch a error related to uknown column" ', async () => {
    const data = await fetch('http://localhost:3000/api/user?where={"uknown" : "Mark Anthony"}', {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    expect(data.status).toBe(400);
});