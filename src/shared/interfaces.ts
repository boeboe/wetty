export interface SSH {
  [s: string]: string | number | boolean | undefined;
  user: string;
  host: string;
  auth: string;
  port: number;
  knownHosts: string;
  pass?: string;
  key?: string;
  config?: string;
}

export interface SSL {
  key: string;
  cert: string;
}

export interface SSLBuffer {
  key?: Buffer;
  cert?: Buffer;
}

export interface Server {
  [s: string]: string | number | boolean;
  port: number;
  host: string;
  title: string;
  base: string;
  allowIframe: boolean;
}

export interface TcpEchoServer {
  enabled: boolean;
  host: string;
  port: number;
}

export interface UdpEchoServer {
  enabled: boolean;
  host: string;
  port: number;
}

export interface Config {
  ssh: SSH;
  server: Server;
  tcpEchoServer: TcpEchoServer;
  udpEchoServer: UdpEchoServer;
  forceSSH: boolean;
  command: string;
  ssl?: SSL;
}
