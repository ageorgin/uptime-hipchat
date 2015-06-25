# uptime-hipchat
This Uptime (https://github.com/fzaninotto/uptime) plugin notifies an HipChat Room using API v2.

To use the plugin, first install it using npm while in the Uptime directory:

```sh
$ npm install uptime-hipchat
```

Then to enable it, add it to the configuration file ie `config/default.yaml`, as follows:

```yaml
plugins:
    - ./node_modules/uptime-hipchat/
```

Customize the settings in the `config/default.yaml` configuration file, adding a `hipchat` section, as in the example below:

```yaml
hipchat:
  roomId: <your room id>
  token: <your token>
  url: 'http://localhost:8082'
```
