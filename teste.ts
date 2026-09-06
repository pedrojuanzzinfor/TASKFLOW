const hash = await Bun.password.hash("minhaSenha", { algorithm:"bcrypt", cost:10} )
console.log(hash)
