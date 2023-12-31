import * as React from "react";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TransformProps,
} from "@yext/pages";
import favicon from "../assets/images/favicon.ico";
import { TemplateMeta } from "../types";
import { CountryDocument } from "../types/index";
import PageLayout from "../components/layout/PageLayout";
import "../index.css";
import { Link } from "@yext/pages/components";
import { DirectoryChild } from "../types/DirectoryChild";
import { getBreadcrumb, getLink } from "../config/GlobalFunctions";
import Breadcrumbs, { BreadcrumbItem } from "../components/common/Breadcrumbs";
import { DirectoryParent } from "../types/DirectoryParent";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "country",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",

      "dm_directoryChildren.name",
      "dm_directoryChildren.id",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.address",
      "dm_directoryChildren.meta.entityType",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.address",
      "dm_directoryChildren.dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.dm_directoryChildren.meta.entityType",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.address",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.meta.entityType",
      "dm_directoryParents.id",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.address",
      "dm_directoryParents.meta.entityType",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_country"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document, __meta }) => {
  if (__meta.mode === "production") {
    return document.slug;
  } else {
    return getLink(document, __meta, true, 0, true);
  }
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  const metaTitle = `Dotsquares | ${document.name}`;
  return {
    title: metaTitle,
    charset: "UTF-8",
    viewport:
      "width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=0",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/png",
          href: favicon,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "author",
          content: "Dotsquares",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "robots",
          content: `${"noindex, nofollow"}`,
        },
      },
    ],
  };
};

type TransformData = TemplateRenderProps & {
  breadcrumbs: BreadcrumbItem[];
};

export const transformProps: TransformProps<TransformData> = async (data) => {
  const document = data.document as CountryDocument;
  const directoryParents = document.dm_directoryParents || [];
  const breadcrumbs = getBreadcrumb<DirectoryParent, CountryDocument>(
    directoryParents,
    document,
    data.__meta,
    true,
    0,
    true
  );
  return { ...data, breadcrumbs };
};

interface CountryTemplateProps extends TransformData {
  __meta: TemplateMeta;
  document: CountryDocument;
}

const country: Template<CountryTemplateProps> = ({
  document,
  __meta,
  breadcrumbs,
}: CountryTemplateProps) => {
  const { _site, meta, slug, dm_directoryChildren, dm_directoryParents, dm_baseEntityCount } = document;

  return (
    <div id="main">
      <PageLayout
        _site={_site}
        meta={__meta}
        template="country"
        locale={meta.locale}
        devLink={slug}
      >
        <Breadcrumbs baseUrl="" breadcrumbs={breadcrumbs} />
        <h1>Country</h1>
        <div className="directory-children">
          {console.log(dm_directoryParents,'dm_directoryParents')}
 
          {dm_directoryChildren &&
            dm_directoryChildren.map((region: DirectoryChild) => {
              const url = dm_directoryParents.map((e)=>{return e.name}) + "/" + document.slug + "/" + region.slug + ".html"
              {console.log(region,'region')}
          
              return (
                <div className="directory-children-card" key={region.slug}>
                  <Link className="directory-children-name" href={`/${url}`}>
                    {region.name} {region.dm_directoryChildren.length}
                  </Link>
                </div>
              );
           
          })}
        </div>
      </PageLayout>
    </div>
  );
};

export default country;
