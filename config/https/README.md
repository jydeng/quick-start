### 如何开启 devServerHTTPS

为什么本地需要 https 环境，因为 Facebook 的 Javascript SDK 只能在 https 环境中方可运行。

#### 0、安装[Chocolatey](https://chocolatey.org/)、[mkcert](https://github.com/FiloSottile/mkcert)

```powershell
choco install mkcert
```

#### 1、使用mkcert生成根证书

```powershell
mkcert -install
```

#### 2、创建目录存放域名证书和私钥

```powershell
D:
mkdir ca
cd ca
```

####

#### 3、生成所需域名对应的本地证书，例如 jydeng.dev

```powershell
mkcert jydeng.dev
```

#### 4、拷贝证书到项目下

#### 5、配置 devServer 开启 Https，配置如下，建议新建一个配置文件，参考webpack.config.dev.https.js

```javascript
 devServer: {
    host: "jydeng.dev",
    port: 80,
    disableHostCheck: true,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "./https/jydeng.dev-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "./https/jydeng.dev.pem")),
    },
  }
```

#### 6、修改 hosts 域名指向，将 jydeng.dev 指向 127.0.0.1

```powershell
notepad C:\Windows\System32\drivers\etc\hosts
127.0.0.1 jydeng.dev
```

#### 7、正常运行项目，此时发现自动打开 jydeng.dev，已经是 https
```powershell
npm run serve:https
```
