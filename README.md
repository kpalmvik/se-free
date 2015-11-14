# se-free
Wraps the Domain Availability Service for Swedish .SE domains in a promised base interface available from [npm](https://www.npmjs.com/). This makes it easy to check if a specified .SE domain is available for registration, already registered, or invalid.

The same interface may also be used to check availability of a .SE contact identifier.

## Usage

### Installation
node
```
$ npm install se-free --save
```
### Check domain availability
The isFree function returns a promise. If the backend service is responding in the expected way, the promise is fulfilled with one of the following values:
* FREE: The domain is available for registration
* OCCUPIED: The domain is already registered
* NOT_VALID: The domain does not comply with the domain naming convention and is not available for registration

If the backend for some reason does not respond in an expected way, the promise is rejected.

```javascript
const isFree = require('se-free'),
      domain = 'example.se';

isFree(domain)
  .then((result) => {
    if(result === 'FREE') {
      console.log('The domain "%s" is available', domain);
    } else {
      console.log('It is not possible to register the domain "%s".', domain);
    }
  })
  .catch((err) => {
    console.log('Something went wrong.');
  });
```

## Backend service
The module relies on the service provided by [free.iis.se](http://free.iis.se/).

The backend service has the following restrictions:
* A maximum of 34 requests per second and client.
* A client will be temporarily blocked after making more than 34 requests per second. The client must be idle for one second to restore access to the service.

See [Rules and description of "free"]( https://www.iis.se/english/domains/free/rules-and-description-of-free/) from [IIS](https://www.iis.se) for more details.

## License
The MIT License (MIT)

Copyright (c) 2015 Kristofer Palmvik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
