class ApiError extends error {
    constructor(
        statusCode,
        message="Smething went wrong",
        error=[],
        statck=""
    ) {
        super(message)
        .this.statusCode=statusCode,
        this.data=null,
        this.message=message,
        this.success=false,
        this.error=Serror

        if(statck){
            this.statck =statck
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
        
    }
}

export{ApiError}