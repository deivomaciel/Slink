function Analytics() {
    <>
    <script 
        async 
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_ANALYTICS_ID}`}
    ></script>
    <script>
        dangerouslySetInnerHTML={{
            __htm: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
        
                gtag('config', '${process.env.REACT_APP_ANALYTICS_ID}');
            `
        }}
    </script>
    </>
}

export default Analytics