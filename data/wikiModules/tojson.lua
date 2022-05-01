-- tojson.lua ./mwApiResponse.json ./outputFile.json
json = require("json")

function values(obj)
    for k, v in pairs(obj) do
        return v
    end
    return nil
end

local fpr = io.open(arg[1], "r")
jsonStr = fpr:read("*all")
obj = json.decode(jsonStr)
page = values(obj.query.pages)
wikitext = page.revisions[1].slots.main['*']
tableFunction = load(wikitext)
local fpw = io.open(arg[2], "w")
fpw:write(json.encode(tableFunction()))
fpw:close()
