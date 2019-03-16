module.exports = {
  apps : [{
    name: 'zone',
    script: '.bin/www',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    cwd:"./",//根目录
    instances: 1,
    autorestart: true,
    watch: true,
    "ignore_watch": [     // 不用监听的文件
        "node_modules",
        "logs"
    ],
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    "error_file": "./logs/err.log",         // 错误日志文件
    "out_file": "./logs/success.log",           // 正常日志文件
    "merge_logs": true,                         // 设置追加日志而不是新建日志
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
