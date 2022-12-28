
test('should update user information', async () => {
    const data = await fetch("http://localhost:3000/api/user/3", {
        "method" : "PATCH",
        body: JSON.stringify({
            "firstName": "update_test",
            "lastName": "update_test",
            "email": "test1@gmail.com",
            "full_address": "makilala, north cotabato",
            "postcode": "0700",
            "phoneNumber": "+639093522667",
            "username": "hello111",
            "password": "password"
        }) ,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    expect(data.status).toBe(200);
});

