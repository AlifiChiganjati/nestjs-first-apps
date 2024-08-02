import * as bcrypt from 'bcrypt';

export class Helper {
  hash(plainPassword) {
    // console.log('masuk hash');
    // console.log(plainPassword);
    const hash = bcrypt.hashSync(plainPassword, 10);
    // console.log(hash);
    return hash;
  }

  compare(plainPassword, hash) {
    // console.log('masuk compare');
    // console.log(plainPassword);
    // console.log(hash);
    const valid = bcrypt.compareSync(plainPassword, hash);
    return valid;
  }
}
