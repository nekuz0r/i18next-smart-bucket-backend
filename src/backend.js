import SmartBucket from 'smart-bucket';

function getDefaults () {
  return {
    tagFormat: '{{lng}}-{{ns}}',
    bucket: {}
  };
}

class Backend {
  constructor (services, options = {}) {
    this.init(services, options);
    this.type = 'backend';
  }

  init (services, options = {}, coreOptions = {}) {
    this.services = services;
    this.options = this.options || {};
    this.options = { ...getDefaults(), ...this.options, ...options };
    this.coreOptions = coreOptions;
    SmartBucket.init(this.options.bucket);
  }

  read (language, namespace, callback) {
    const tag = this.services.interpolator.interpolate(this.options.tagFormat, {
      lng: language,
      ns: namespace
    });

    SmartBucket.get(tag)
    .then((resources) => {
      return callback(null, resources);
    })
    .catch((error) => {
      return callback(error, false);
    });
  }
}

Backend.type = 'backend';

export default Backend;
