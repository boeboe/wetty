/**
 * Create UDP Echo server
 * @module WeTTy
 */
import type { UdpEchoServer } from './shared/interfaces.js';
import { logger } from './shared/logger.js';
import {
  udpEchoServerDefault,
} from './shared/defaults.js';
import udp from 'dgram';

/**
 * Starts UDP Echo Server
 * @name startUdpEcho
 * @returns UDP server
 */
export function startUdpEcho(
    udpEchoServerConf: UdpEchoServer = udpEchoServerDefault,
  ): udp.Socket {

    const server = udp.createSocket('udp4')

    server.on('error', (error) => {
        logger.error(error)
        server.close()
    })

    server.on('message', (msg,info) => {
        logger.info( msg.toString() + ` | Received ${msg.length} bytes from ${info.address}:${info.port}`)

        let timestp = new Date()
        const response = {
            description: 'UDP PORT TEST BY RMS Math',
            serverIP: udpEchoServerConf.host,
            serverPort: udpEchoServerConf.port,
            timestamp: timestp.toJSON(),
            received: {
                message: msg.toString(),
                fromIP: info.address,
                fromPort: info.port
            }
        }
        const data = Buffer.from(JSON.stringify(response))

        server.send(data, info.port, info.address, (error, bytes) => {
            if(error){
                logger.error(error)
                server.close()
            } else {
                logger.info('Data sent !!!')
            }    
        })
    })

    server.on('listening', () => {
        const address = server.address()
        const port = address.port
        const family = address.family
        const ipaddr = address.address

        logger.info('Server is listening at port ' + port)
        logger.info('Server ip :' + ipaddr)
        logger.info('Server is IP4/IP6 : ' + family)
    })

    //emits after the socket is closed using socket.close()
    server.on('close', () => {
        logger.info('Socket is closed !')
    })

    server.bind(udpEchoServerConf.port, udpEchoServerConf.host)
    return server;
}