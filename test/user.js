import supertest from "supertest";
import { expect } from "chai";
const request = supertest('https://gorest.co.in//public-api/');
const TOKEN = "8f772e0a32f084370ac1c590dab582baced6cc2d799a2f97fbefbfeaa434ddaf";

describe('Users', () => {
    it('GET /users', (done) => {
        request
            .get(`users?acces-token=${TOKEN}`).end((err,res) => {
                expect(res.body.data).to.not.be.empty;
                done();     // callback to done, so negative test wouldn't fail.
            });
    });
});
