import { HttpException, HttpStatus } from '@nestjs/common';

function firstKey(obj) {
  for (var key in obj)
    if (Object.getOwnPropertyDescriptor(obj, key)) return key;
}

export function HandleError(error: any) {
  if (error.name === 'MongoServerError') {
    switch (error.code) {
      case 11000:
        throw new HttpException(
          `The [${firstKey(error.keyValue)}] param already exists!`,
          HttpStatus.CONFLICT,
        );
      default:
        throw new HttpException(
          `An error has expected!`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  } else if (error.name === 'ValidationError') {
    console.log(error);
    throw new HttpException(
      //`The [${error.errors[firstKey(error.errors)].path}] param is not valid!}`,
      error.message,
      HttpStatus.BAD_REQUEST,
    );
  } else {
    throw new HttpException(
      'An error has expected!',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
