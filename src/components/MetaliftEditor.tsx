import AceEditor from "react-ace";
import { useAtom } from "jotai";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";

import { sourceAtom } from "../atoms/source";

const MetaliftEditor = () => {
  const [inOrder, setInOrder] = useAtom(sourceAtom);

  return (
    <AceEditor
      mode="python"
      value={inOrder}
      onChange={(source: string) => setInOrder(source)}
      name="metalift-editor"
      height="100%"
      width="100%"
      className="col-span-12 lg:col-span-4 font-mono"
      setOptions={{
        theme: "ace/theme/twilight",
      }}
      fontSize={13}
    />
  );
};

export default MetaliftEditor;
