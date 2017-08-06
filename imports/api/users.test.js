import expect from 'expect';
import { Meteor } from 'meteor/meteor';

import { validateNewUser } from './users';

if (Meteor.isServer) {
    describe('users', function () {
        it('should allow valid email address', function () {
            const testUser = { emails: [{ address: 'text@example.com' }] }
            const result = validateNewUser(testUser);
            expect(result).toBe(true);
        });

        it('should reject invalid email address', function () {
            expect(() => {
                const testUser = { emails: [{ address: 'text' }] }
                const result = validateNewUser(testUser);
            }).toThrow();
        });
    });
}

// const add = (a, b) => {
//     if (typeof b !== 'number') {
//         return a + a;
//     }

//     return a + b;
// };

// const square = a => a * a;

// describe('add', function () {
//     it('should add two numbers', function () {
//         const result = add(11, 9);
//         expect(result).toBe(20);
//     });

//     it('should double a number', function () {
//         const result = add(44);
//         expect(result).toBe(88);
//     });
// });

// describe('square', function () {
//     it('it should square a number', function () {
//         const result = square(12);
//         expect(result).toBe(144);
//     });
// });

