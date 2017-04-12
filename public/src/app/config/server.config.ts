interface ServerConfiguration {
    hostname: string,
    port: string,
    protocol: string
}

export const serverConfig: ServerConfiguration = {
    hostname: "localhost",
    port: "57025",
    protocol: "http"
};