const supertest = require('supertest')

const server = require('./server')

const db = require('./connection')


describe('server operations', () => {

    describe('POST /api/auth/register', () => { 


        it('should return HTTP status code 201 when passed correct data', async () => {
            return supertest(server)
                .post('/api/auth/register')
                .send({ email: 'tahilyyy@bp.com', password: 'pass' })
                .then(res => {
                    
                    expect(res.status).toBe(201)
                })
        })

        it('should insert new user into the database', () => {

            return supertest(server)
                .post('/api/auth/register')
                .send({ email: 'testyy@test.com', password: 'pass' })
                .then(res => {
                    console.log(res.body)
                    expect(res.body.data.email).toBe('testyy@test.com') 
                })
        })

        it('should return status code 400 if not all info provided', () => {

            return supertest(server)
                .post('/api/auth/register')
                .send({ email: '', password: 'pass' })
                .then(res => {
                    // console.log(res.body)
                    expect(res.status).toBe(400) 
                })
        })

    })


    describe('POST /api/auth/login', () => { 


        it('should return HTTP status code 200 when passed correct data', () => {
            return supertest(server)
                .post('/api/auth/login')
                .send({ email: 'test@test.com', password: 'pass' })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('should return HTTP status code 401 when passed incorrect data', async () => {

            return supertest(server)
                .post('/api/auth/login')
                .send({ email: 'ggregory@wilson.com', password: 'passs' })
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })

    })


    describe('GET /api/savedstrains', () => { 

        let token;

        beforeAll((done) => {
          supertest(server)
            .post('/api/auth/login')
            .send({
              email: 'test@test.com',
              password: 'pass',
            })
            .end((err, response) => {
                // console.log(response)
              token = response.body.token; 
              done();
            });
        });

        it('should require return 401 because no authorization present', () => {
            return supertest(server)
                .get('/api/savedstrains')
                .then(res => {
                     expect(res.status).toBe(401)
                })
        })

        it('should return status code 200 - OK, when uses credentials', () => {

            return supertest(server)
            
                .get('/api/savedstrains')
                .set('Authorization', token) 
                .then(res => {
                 expect(res.status).toBe(200)
                })
                
        })
    
    })

})