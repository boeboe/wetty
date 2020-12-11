import type { SSH, Server, TCPEchoServer, UDPEchoServer } from './interfaces';

export const sshDefault: SSH = {
  user: process.env.SSHUSER || '',
  host: process.env.SSHHOST || 'localhost',
  auth: process.env.SSHAUTH || 'password',
  pass: process.env.SSHPASS || undefined,
  key: process.env.SSHKEY || undefined,
  port: parseInt(process.env.SSHPORT || '22', 10),
  knownHosts: process.env.KNOWNHOSTS || '/dev/null',
  config: process.env.SSHCONFIG || undefined,
};

export const serverDefault: Server = {
  base: process.env.BASE || '/wetty/',
  port: parseInt(process.env.PORT || '3000', 10),
  host: '0.0.0.0',
  title: process.env.TITLE || 'WeTTy - The Web Terminal Emulator',
  allowIframe: false,
};

export const tcpEchoServerDefault: TCPEchoServer = {
  enabled: process.env.TCPECHOENABLED === 'true' || false,
  host: '0.0.0.0',
  port: parseInt(process.env.TCPECHOPORT || '3001', 10),
};

export const udpEchoServerDefault: UDPEchoServer = {
  enabled: process.env.UDPECHOENABLED === 'true' || false,
  host: '0.0.0.0',
  port: parseInt(process.env.UDPECHOPORT || '3002', 10),
};

export const forceSSHDefault = process.env.FORCESSH === 'true' || false;
export const defaultCommand = process.env.COMMAND || 'login';
