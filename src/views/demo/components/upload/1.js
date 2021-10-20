/*
 * @Author: zeHua
 * @Date: 2021-10-14 14:08:57
 * @LastEditors: zeHua
 * @LastEditTime: 2021-10-14 14:09:05
 * @FilePath: /yd-admin/src/views/demo/components/upload/1.js
 */
public static class HttpContextExtension {         通过文件流下载文件         文件完整路径        访问这里 https://tool.oschina.net/commons         public static void DownLoadFile(this HttpContext context,string filePath, string contentType= "application/octet-stream")        {            var fileName = Path.GetFileName(filePath);            int bufferSize = 1024;             context.Response.ContentType = contentType;            context.Response.Headers.Append("Content-Disposition", "attachment;filename=" + HttpUtility.UrlEncode(fileName));            context.Response.Headers.Append("Charset", "utf-8");            context.Response.Headers.Append("Access-Control-Expose-Headers", "Content-Disposition");            //context.Response.Headers.Append("Access-Control-Allow-Origin", "*");            //使用FileStream开始循环读取要下载文件的内容            using (FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read))            {                using (context.Response.Body)                 {                    long contentLength = fs.Length;                     context.Response.ContentLength = contentLength;                    byte[] buffer;                    long hasRead = 0;                      while (hasRead < contentLength)                    {                        if (context.RequestAborted.IsCancellationRequested)                        {                            break;                        }                        buffer = new byte[bufferSize];                        //从下载文件中读取bufferSize(1024字节)大小的内容到服务器内存中                        int currentRead = fs.Read(buffer, 0, bufferSize);                        context.Response.Body.Write(buffer, 0, currentRead);                        context.Response.Body.Flush();                        hasRead += currentRead;                    }                    context.Response.Body.Close();                }                fs.Close();            }        }        ///         /// 通过文件流下载文件        ///         ///         /// 文件完整路径        /// 访问这里 https://tool.oschina.net/commons         public static void DownLoadFile(this HttpContext context,string fileName, byte[] fileByte, string contentType = "application/octet-stream")        {            int bufferSize = 1024;                        context.Response.ContentType = contentType;            context.Response.Headers.Append("Content-Disposition", "attachment;filename=" + HttpUtility.UrlEncode(fileName));            context.Response.Headers.Append("Charset", "utf-8");            context.Response.Headers.Append("Access-Control-Expose-Headers", "Content-Disposition");                     //context.Response.Headers.Append("Access-Control-Allow-Origin", "*");            //使用FileStream开始循环读取要下载文件的内容            using (Stream fs = new MemoryStream(fileByte))            {                using (context.Response.Body)                {                    long contentLength = fs.Length;                    context.Response.ContentLength = contentLength;                    byte[] buffer;                    long hasRead = 0;                    while (hasRead < contentLength)                    {                        if (context.RequestAborted.IsCancellationRequested)                        {                            break;                        }                                                buffer = new byte[bufferSize];                        //从下载文件中读取bufferSize(1024字节)大小的内容到服务器内存中                        int currentRead = fs.Read(buffer, 0, bufferSize);                        context.Response.Body.Write(buffer, 0, currentRead);                        context.Response.Body.Flush();                        hasRead += currentRead;                    }                }            }        }    }