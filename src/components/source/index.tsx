import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { memo, useCallback, useMemo } from "react";

import { Button } from "components/button";
import {
  identity,
  SelectFormField,
  TextInputFormField,
} from "components/form-field";
import { Text } from "components/text";
import { useIsFirstRender } from "data/use-is-first-render";
import {
  type Format,
  type Location,
} from "generated/albumFormFragment.graphql";
import { formatInteger, parseInteger } from "utils";
import {
  accurateRipSchema,
  cueIssuesSchema,
  discsSchema,
  downloadSchema,
  editionSchema,
  mbidSchema,
  sourceCommentsSchema,
  sourceFormats,
  sourceFormatsSchema,
  sourceLocations,
  sourceLocationsSchema,
  tagIssuesSchema,
} from "utils/validation";

import { hrStyle, linkStyle, titleStyle } from "./styles.css";

export type SourceData = {
  readonly accurateRip: string | null;
  readonly comments: string | null;
  readonly cueIssues: string | null;
  readonly discs: number | null;
  readonly download: string | null;
  readonly edition: string | null;
  readonly format: Format | null;
  readonly id?: string;
  readonly location: Location;
  readonly mbid: string | null;
  readonly tagIssues: string | null;
};

type SourceProps = {
  readonly disabled: boolean;
  readonly index: number;
  readonly onRemove: (index: number) => void;
  readonly onUpdate: (index: number, source: Readonly<SourceData>) => void;
  readonly source: SourceData;
};

export const Source = memo(function Source({
  disabled,
  index,
  onRemove,
  onUpdate,
  source,
}: SourceProps) {
  const remove = useCallback(() => {
    onRemove(index);
  }, [index, onRemove]);

  const onLocationChange = useCallback(
    (value: Location) => {
      onUpdate(index, { ...source, location: value });
    },
    [index, onUpdate, source],
  );

  const onFormatChange = useCallback(
    (value: Format) => {
      onUpdate(index, { ...source, format: value });
    },
    [index, onUpdate, source],
  );

  const onEditionChange = useCallback(
    (edition: string | null) => {
      onUpdate(index, { ...source, edition });
    },
    [index, onUpdate, source],
  );

  const onCommentsChange = useCallback(
    (comments: string | null) => {
      onUpdate(index, { ...source, comments });
    },
    [index, onUpdate, source],
  );

  const parsedMbid = useMemo(() => {
    return mbidSchema.safeParse(source.mbid);
  }, [source.mbid]);

  const onMbidChange = useCallback(
    (mbid: string | null) => {
      onUpdate(index, { ...source, mbid });
    },
    [index, onUpdate, source],
  );

  const onTagIssuesChange = useCallback(
    (tagIssues: string | null) => {
      onUpdate(index, { ...source, tagIssues });
    },
    [index, onUpdate, source],
  );

  const onAccurateRipChange = useCallback(
    (accurateRip: string | null) => {
      onUpdate(index, { ...source, accurateRip });
    },
    [index, onUpdate, source],
  );

  const onCueIssuesChange = useCallback(
    (cueIssues: string | null) => {
      onUpdate(index, { ...source, cueIssues });
    },
    [index, onUpdate, source],
  );

  const onDownloadChange = useCallback(
    (download: string | null) => {
      onUpdate(index, { ...source, download });
    },
    [index, onUpdate, source],
  );

  const onDiscsChange = useCallback(
    (discs: number | null) => {
      onUpdate(index, { ...source, discs });
    },
    [index, onUpdate, source],
  );

  const isFirstRender = useIsFirstRender();

  return (
    <>
      <hr className={hrStyle} />
      <div className={titleStyle}>
        <Text color="grey" size="medium" weight="bold">
          Source {index + 1}
        </Text>
        <Button disabled={disabled} onClick={remove} size="small">
          Delete source
        </Button>
      </div>
      <SelectFormField
        label="Location"
        onChange={onLocationChange}
        options={sourceLocations}
        schema={sourceLocationsSchema}
        value={source.location}
      />

      <TextInputFormField
        format={(value) => value ?? ""}
        label="MBID"
        onChange={onMbidChange}
        parse={identity}
        schema={mbidSchema}
        value={source.mbid}
      >
        <motion.div
          animate={{
            height: parsedMbid.success && parsedMbid.data !== null ? "auto" : 0,
          }}
          initial={{
            height: parsedMbid.success && parsedMbid.data !== null ? "auto" : 0,
          }}
          transition={{ duration: 0.15 }}
        >
          <AnimatePresence mode="wait">
            {parsedMbid.success && parsedMbid.data !== null && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: isFirstRender ? 1 : 0 }}
                transition={{ duration: 0.15 }}
              >
                <Text color="blue" size="small">
                  <Link
                    className={linkStyle}
                    href={`https://musicbrainz.org/release/${parsedMbid.data}`}
                    target="_blank"
                  >
                    View on MusicBrainz
                  </Link>
                </Text>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </TextInputFormField>

      <TextInputFormField
        format={(value) => value ?? ""}
        label="Comments"
        onChange={onCommentsChange}
        parse={identity}
        schema={sourceCommentsSchema}
        value={source.comments}
      />

      <motion.div
        animate={{ height: source.location !== "SPOTIFY" ? "auto" : 0 }}
        initial={{ height: source.location !== "SPOTIFY" ? "auto" : 0 }}
        transition={{ duration: 0.15 }}
      >
        <AnimatePresence mode="wait">
          {source.location !== "SPOTIFY" && (
            <motion.div
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: isFirstRender ? 1 : 0 }}
              transition={{ duration: 0.15 }}
            >
              <TextInputFormField
                format={(value) => value ?? ""}
                label="Tag issues"
                onChange={onTagIssuesChange}
                parse={identity}
                schema={tagIssuesSchema}
                value={source.tagIssues}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        animate={{ height: source.location === "FOOBAR2000" ? "auto" : 0 }}
        initial={{ height: source.location === "FOOBAR2000" ? "auto" : 0 }}
        transition={{ duration: 0.15 }}
      >
        <AnimatePresence mode="wait">
          {source.location === "FOOBAR2000" && (
            <motion.div
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: isFirstRender ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <TextInputFormField
                format={(value) => value ?? ""}
                label="Accurate rip"
                onChange={onAccurateRipChange}
                parse={identity}
                schema={accurateRipSchema}
                value={source.accurateRip}
              />

              <TextInputFormField
                format={(value) => value ?? ""}
                label="Cue issues"
                onChange={onCueIssuesChange}
                parse={identity}
                schema={cueIssuesSchema}
                value={source.cueIssues}
              />

              <TextInputFormField
                format={formatInteger}
                label="Discs"
                onChange={onDiscsChange}
                parse={parseInteger}
                schema={discsSchema}
                value={source.discs}
              />

              <TextInputFormField
                format={(value) => value ?? ""}
                label="Download"
                onChange={onDownloadChange}
                parse={identity}
                schema={downloadSchema}
                value={source.download}
              />

              <TextInputFormField
                format={(value) => value ?? ""}
                label="Edition"
                onChange={onEditionChange}
                parse={identity}
                schema={editionSchema}
                value={source.edition}
              />

              <SelectFormField
                label="Format"
                onChange={onFormatChange}
                options={sourceFormats}
                schema={sourceFormatsSchema}
                value={source.format}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
});
