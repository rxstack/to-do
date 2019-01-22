export const environment = {
  express_server: {
    host: '0.0.0.0',
    prefix: '/api'
  },
  socketio_server: {
    host: '0.0.0.0'
  },
  servers: ['express', 'socketio'],
  logger: {
    handlers: [
      {
        type: 'console',
        options: {
          level: 'silly',
        }
      }
    ]
  },
  in_memory_users: [
    {
      username: 'admin',
      password: 'admin',
      roles: ['ROLE_ADMIN']
    },
    {
      username: 'user',
      password: 'user',
      roles: ['ROLE_USER']
    }
  ],
  security: {
    transports: ['HTTP', 'SOCKET'],
    token_extractors: {
      authorization_header: {
        enabled: true,
      }
    },
    local_authentication: true,
    ttl: 30000,
    secret: 'my_secret',
    signature_algorithm: 'HS512',
  },
};