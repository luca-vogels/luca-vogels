import React from "react";
import styles from './page.module.css';
import loadTranslations from "../translations";
import { MetadataContext, StaticParamsContext } from "../../../services/Types.service";
import { Metadata } from "next";

export default async function Home({ params }: StaticParamsContext) {
  const locale = params.locale;
  const TEXT = await loadTranslations(locale, ['HelloWorld']);

  return <>
    <b>Content</b>
  </>
}

export async function generateMetadata(context: MetadataContext): Promise<Metadata> {
  const locale = context.params.locale;
  const TEXT = await loadTranslations(locale, ['AboutMe', 'AboutMeDescription']);

  return {
    title: TEXT['AboutMe'],
    description: TEXT['AboutMeDescription'],
  };
}