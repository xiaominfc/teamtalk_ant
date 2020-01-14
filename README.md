# Ant Design Pro for Teamtalk

ant design pro 实现teamtalk 后台管理前端

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
#or
npm run start:no-mock

```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

### 后端

用我维护的teamtalk分支中的php项目作为管理项目的后端 [https://github.com/xiaominfc/TeamTalk](https://github.com/xiaominfc/TeamTalk)


### config for apache(url 重写跟 api 代理)


当该项目运行的域名与teamtalk php后台的域名不一样的时候 可进行一下配置

```
    ProxyPass /api/login/account http://local.xiaominfc.com/auth/userlogin
    ProxyPassReverse /api/login/account http://local.xiaominfc.com/auth/userlogin
    ProxyPass /api/logout http://local.xiaominfc.com/auth/userlogout
    ProxyPassReverse /api/logout http://local.xiaominfc.com/auth/userlogout
    ProxyPass /api/currentUser http://local.xiaominfc.com/auth/currentUser
    ProxyPassReverse /api/currentUser http://local.xiaominfc.com/auth/currentUser
    ProxyPass /api/user http://local.xiaominfc.com/user/action
    ProxyPassReverse /api/user http://local.xiaominfc.com/user/action
    ProxyPass /api/depart http://local.xiaominfc.com/depart/action
    ProxyPassReverse /api/depart http://local.xiaominfc.com/depart/action
    ProxyPass /api/group http://local.xiaominfc.com/group/action
    ProxyPassReverse /api/group http://local.xiaominfc.com/group/action
    ProxyPass /api/discoverys http://local.xiaominfc.com/discovery/action
    ProxyPassReverse /api/discoverys http://local.xiaominfc.com/discovery/action
    ProxyPass /api/groupusers http://local.xiaominfc.com/group/getMember
    ProxyPassReverse /api/groupusers http://local.xiaominfc.com/group/getMember
    ProxyPass /api/editmember http://local.xiaominfc.com/group/editmember
    ProxyPassReverse /api/editmember http://local.xiaominfc.com/group/editmember
    RewriteEngine On
    RewriteCond %{DOCUMENT_ROOT}/%{REQUEST_URI} !-f
    RewriteRule !/api /index.html [L]

```

### 指定block

```
umi block list

```


local.xiaominfc.com 换成你自己的


