<div align="center">
  <br>
  <p>
    <a href="https://wwebjs.dev"><img
        src="https://github.com/wwebjs/logos/blob/main/4_Full%20Logo%20Lockup_Small/small_banner_blue.png?raw=true"
        title="wwebjs.dev Guide" alt="wwebjs.dev Guide" width="500" /></a>
  </p>
</div>

## About

We have integrated linked roles into our [Discord server][discord], making it more organized and enhancing the user experience. Users can now link their Discord profile to GitHub, allowing us to verify their identity. This gives users access to additional channels and roles, such as Lib `Contributor`, `Guide Contributor`, and more. These roles are no longer assigned manually by the team; users can automatically receive them by visiting the [role API][api] and linking their Discord account.

## How to use

1. Link your Discord account to GitHub on the connections page in Discord.
2. Open the dropdown menu in the Discord server and click on "Linked Roles".
3. Select the role you want to assign to yourself and press on the WWebJS requirement.
4. Visit the [role API][api] and log in with your Discord account.
5. The role API redirects you and displays a log-in/failed/success page with information.
6. You can now collect the roles and access the channels.

[Here][example] you can find an exmaple of the process.

## How it works

The user connects at `/verify` and is then redirected to log in with Discord. After logging in, the user is redirected to our role API, which sends a request to the Discord API to obtain the user's Discord identity. The user is then redirected back to `/discord-oauth-callback`, where the information is processed. The role API checks the database to see if the user is already registered, whether they are blocked manually, and if a request to GitHub has been made in the last hour to reduce data traffic. If not, the role API sends a request to the GitHub API to get the user's GitHub contributions. Then, the role API sends a request to the Discord API to add metadata information. If everything is successful, the user will see a *success page*. The user can now collect roles on Discord and access restricted channels.

## Resources

- [Discord documentation][discord-docs]
- [Vercel documentation][vercel-docs]
- [Apollo documentation][apollo-docs]
- [MongoDB documentation][mongodb-docs]
- [Express documentation][express-docs]

## WWebJS Links

* [Website][website]
* [Guide][guide] ([source][guide-source]) _(work in progress)_
* [Documentation][documentation] ([source][documentation-source])
* [WWebJS Discord][discord]
* [GitHub][gitHub]
* [npm][npm]

## License

WWebJS discord-linkedroles is licensed under the MIT license. Please see the [LICENSE file](LICENSE) for more information.

[example]: ./example.md
[api]: https://wwebjs-linkedroles.vercel.app/verify
[discord-docs]: https://discord.com/developers/docs
[vercel-docs]: https://vercel.com/docs
[apollo-docs]: https://www.apollographql.com/docs/
[mongodb-docs]: https://docs.mongodb.com/
[express-docs]: https://expressjs.com/en/4x/api.html
[website]: https://wwebjs.dev
[guide]: https://guide.wwebjs.dev/guide
[guide-source]: https://github.com/wwebjs/wwebjs.dev/tree/main
[documentation]: https://docs.wwebjs.dev/
[documentation-source]: https://github.com/pedroslopez/whatsapp-web.js/tree/main/docs
[discord]: https://discord.gg/H7DqQs4
[gitHub]: https://github.com/pedroslopez/whatsapp-web.js
[npm]: https://npmjs.org/package/whatsapp-web.js