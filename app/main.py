import uvicorn


def main():
    uvicorn.run(
        "app.api:app",
        host="0.0.0.0",
        port=8000,
        log_level="debug",
        use_colors=False,
        access_log=False,
        # ssl_keyfile="path/to/sslkeyfile",
        # ssl_certfile="path/to/sslcertfile",
        # ssl_version=ssl.PROTOCOL_TLSv1_2,
        # ssl_ciphers="ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384",
    )


if __name__ == "__main__":
    main()
