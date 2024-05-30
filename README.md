<div align="center">
  <br>
  <p>
    <a href="https://wwebjs.dev"><img
        src="https://github.com/wwebjs/logos/blob/main/4_Full%20Logo%20Lockup_Small/small_banner_blue.png?raw=true"
        title="wwebjs.dev Guide" alt="wwebjs.dev Guide" width="500" /></a>
  </p>
</div>

## About

We have integrated linked roles into our [Discord server][discord], making it more organized and enhancing the user experience. Users can now link their Discord profile to GitHub, allowing us to verify their identity. This gives users access to additional channels and roles, such as Lib Contributor, Guide Contributor, and more. These roles are no longer assigned manually; users can automatically receive them by visiting the [website][api] and linking their Discord account.

## How to use

1. Users link their Discord account to GitHub in the connection page on discord.
2. Users visit the [website][api] and log in with their Discord account.
3. The website sends a request to the Discord API to get the user's Discord identity.
4. The website sends a request to the GitHub API to get the user's GitHub contributions.
5. The website sends a request to the Discord API to add the metadata informations.
6. The Users are now able to collect the roles and access the channels.

## How it works

The user connects at `/verify` and is then redirected to log in with Discord. After logging in, the user is redirected to our role API, which sends a request to the Discord API to obtain the user's Discord identity. The user is then redirected back to `/discord-oauth-callback`, where the information is processed. The role API checks the database to see if the user is already registered, whether they are blocked manually, and if a request to GitHub has been made in the last hour to reduce data traffic. If not, the role API sends a request to the GitHub API to get the user's GitHub contributions. Then, the role API sends a request to the Discord API to add metadata information. If everything is successful, the user will see a *success page*. The user can now collect roles on Discord and access restricted channels.

## Links

* [Website][website]
* [Guide][guide] ([source][guide-source]) _(work in progress)_
* [Documentation][documentation] ([source][documentation-source])
* [WWebJS Discord][discord]
* [GitHub][gitHub]
* [npm][npm]

[api]: https://wwebjs-linkedroles.vercel.app/verify
[website]: https://wwebjs.dev
[guide]: https://guide.wwebjs.dev/guide
[guide-source]: https://github.com/wwebjs/wwebjs.dev/tree/main
[documentation]: https://docs.wwebjs.dev/
[documentation-source]: https://github.com/pedroslopez/whatsapp-web.js/tree/main/docs
[discord]: https://discord.gg/H7DqQs4
[gitHub]: https://github.com/pedroslopez/whatsapp-web.js
[npm]: https://npmjs.org/package/whatsapp-web.js

## License

WWebJS discord-linkedroles is licensed under the MIT license. Please see the [LICENSE file](LICENSE) for more information.
