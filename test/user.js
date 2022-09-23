import supertest from "supertest";
import { expect } from "chai";
const request = supertest('https://gorest.co.in//public-api/');
const TOKEN = "8f772e0a32f084370ac1c590dab582baced6cc2d799a2f97fbefbfeaa434ddaf";

describe('Users', () => {
    let userId;
    describe('POST', () =>{
        it('/users' , () => {
            const data = {
                email: `apitesting-${Math.floor(Math.random() * 1000)}@mymail.com`,
                name: 'Testing Names',
                gender: 'male',
                status: 'active',
            }
    
            return request
                .post('users')
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(data)
                .then((res) => {
                    expect(res.body.data).to.deep.include(data);
                    userId = res.body.data.id;
                });
        });
    })
    describe('GET', () => {
      
        it('/users', () => {
/*         request
            .get(`users?acces-token=${TOKEN}`).end((err,res) => {
                expect(res.body.data).to.not.be.empty;
                done();     // callback to done, to increase reliabilty.
            }); */
    
            return request
            .get(`users?acces-token=${TOKEN}`).then((res) => {
                expect(res.body.data).to.not.be.empty;
                     // .then same as callback
            });
    });
        it('/users/:id' , () => {
            return request
            .get(`users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .then((res) => {
                expect(res.body.data.id).to.be.eq(userId);
            });
    });
        it('/users with query params' , () =>{
            return request
            .get('users?&page=2&gender=male&status=active')
            .set('Authorization', `Bearer ${TOKEN}`)
            .then((res) =>{ 
            res.body.data.forEach(resData => {
                expect(resData.gender).to.eq('male');
                expect(resData.status).to.eq('active')
            });
            });
    });
    describe('PUT', () =>{
        it('users/:id', () =>{
        const data = {
            name: `Name${Math.floor(Math.random() * 1000)}`,
            email : `apitesting-${Math.floor(Math.random() * 1000)}@mymail.com`,
            gender: 'female',
            status: 'inactive',
        };

        return request
        .put(`users/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        .then((res) =>{
            expect(res.body.data).to.deep.include(data);
        })

    })
    });
    describe('DELETE', () => {
        it('users/:id' , () => {
        return request
        .del(`users/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .then((res) => {
            expect(res.body.data).to.be.eq(null);
        });
    });
    });
});
});
