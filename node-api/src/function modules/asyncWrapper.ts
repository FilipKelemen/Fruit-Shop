
type Callback = (req:Express.Request,res:Express.Response,next?:any) =>  any;


export let asyncWrapper = (callback: Callback): Callback => {
  return  (req,res,next) => {
    callback(req,res,next)
      .catch(next);
  }
}