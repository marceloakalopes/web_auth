import bcrypt from 'bcrypt';

function validPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}

module.exports = validPassword;