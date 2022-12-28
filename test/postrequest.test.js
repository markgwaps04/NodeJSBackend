
test('should insert user information', async () => {
    const data = await fetch("http://localhost:3000/api/user", {
        "method" : "POST",
        body: JSON.stringify({
            "firstName": "test",
            "lastName": "test",
            "email": "test@gmail.com",
            "full_address": "makilala, north cotabato",
            "postcode": "0700",
            "phoneNumber": "+639093522667",
            "username": "hello",
            "password": "password"
        }) ,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    expect(data.status).toBe(200);
});



test('should catch error related to unique constraint for username field', async () => {
    const data = await fetch("http://localhost:3000/api/user", {
        "method" : "POST",
        body: JSON.stringify({
            "firstName": "test",
            "lastName": "test",
            "email": "test@gmail.com",
            "full_address": "makilala, north cotabato",
            "postcode": "0700",
            "phoneNumber": "+639093522667",
            "username": "hello",
            "password": "password"
        }) ,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    expect(data.status).toBe(400);
});


test('should catch error related to null constraint for firstName field', async () => {
    const data = await fetch("http://localhost:3000/api/user", {
        "method" : "POST",
        body: JSON.stringify({
            "firstName": null,
            "lastName": "test",
            "email": "test@gmail.com",
            "full_address": "makilala, north cotabato",
            "postcode": "0700",
            "phoneNumber": "+639093522667",
            "username": "hello12",
            "password": "password"
        }) ,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    expect(data.status).toBe(400);
});
