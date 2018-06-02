﻿using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using Newtonsoft.Json.Linq;
using System.IO;
using Microsoft.AspNetCore.Hosting.Server;

namespace webpack.Helpers
{
    public static class MyHTMLHelpers
    {
        //public static IHtmlContent HelloWorldHTMLString(this IHtmlHelper htmlHelper)
            //=> new HtmlString("<strong>Hello World</strong>");

        public static String Bundle(this IHtmlHelper htmlHelper, string key) {
            var manifestPath = "/Users/thomasshannon/Desktop/webpack-dot/webpack/wwwroot/dist/manifest.json";
            var fileExists = File.Exists(manifestPath);
            if (fileExists)
            {
                JObject o = JObject.Parse(File.ReadAllText(manifestPath));

                //if (o) {
                    if (key == "css") 
                    {
                        var css = (o[key]);

                    if (css.Type == JTokenType.String)
                        {
                            return $"<link rel='stylesheet' href='/dist/{ css }'" + "/>";   
                        } 
                        else {
                            var str = "";
                            foreach (var style in css)
                            {
                                str += $"<link rel='stylesheet' href='/dist/{style}' />";    
                            }

                            return str;
                        }

                    }

                    if (key == "js") {
                        var js = o[key];
                        if (js.Type == JTokenType.String)
                        {
                            return $"<script src='/dist/{ js }'></script>";
                        }
                        else
                        {
                            var str = "";
                            foreach (var script in js)
                            {
                                str += $"<script src='/dist/{script}'></script>";
                            }

                            return str;
                        }
                    }
                //}
            }

            return "";
        }
    }
}