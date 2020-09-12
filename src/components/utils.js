export async function timeout(ms){
    await new Promise(resolve=>{
        setTimeout(()=>{
            console.log("timed out")
            resolve()
        },ms)
    })
}