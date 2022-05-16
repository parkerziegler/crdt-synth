import * as React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import vsDark from "prism-react-renderer/themes/vsDark";
import { useAtomValue } from "jotai";
import cs from "classnames";

import { pairedOperationsAtom } from "../atoms/operations";
import { synthesize } from "../synthesis/synthesis";
import { conflictsAtom } from "../atoms/conflicts";

const Synthesizer = () => {
  const pairedOperations = useAtomValue(pairedOperationsAtom);
  const conflicts = useAtomValue(conflictsAtom);

  const programs = React.useMemo(() => {
    // Only run the synthesizer if all conflicts have been resolved.
    return conflicts.length === 0 ? synthesize(pairedOperations) : [];
  }, [conflicts, pairedOperations]);

  return (
    <div className="col-span-12 lg:col-span-4 flex lg:flex-col font-mono border-l border-l-outline overflow-auto">
      <h2 className="text-4xl font-mono text-neon p-8 border-b border-b-outline text-vertical lg:text-horizontal">
        Candidates
      </h2>
      {conflicts.length > 0 ? (
        <p className="p-8 text-3xl font-mono text-white">
          Resolve commutative conflicts to see synthesized candidates...
        </p>
      ) : (
        programs.map((program, i) => (
          <Highlight
            {...defaultProps}
            code={program.format()}
            language="python"
            theme={vsDark}
            key={i}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={cs(
                  "p-8 text-2xl overflow-auto border-b border-b-outline",
                  className
                )}
                style={style}
              >
                {tokens.map((line, i) => (
                  <div
                    {...getLineProps({ line, key: i })}
                    className="table-row"
                  >
                    <span className="table-cell pr-4 text-right select-none opacity-50">
                      {i + 1}
                    </span>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        ))
      )}
    </div>
  );
};

export default Synthesizer;
