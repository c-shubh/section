/*
Copyright © 2024 Shubh A Chudasama <shubh.cs@proton.me>
*/
package cmd

import (
	"cshubh/section/services"
	"os"

	"github.com/atotto/clipboard"
	"github.com/spf13/cobra"
)

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:     "section [text]",
	Short:   "A CLI to generate section divider comments.",
	Long:    "A CLI to generate section divider comments for various programming languages.",
	Args:    cobra.ExactArgs(1),
	Version: "0.0.1",
	Run: func(cmd *cobra.Command, args []string) {
		var comment = services.GenerateComment(args[0])
		clipboard.WriteAll(comment)
	},
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	// Here you will define your flags and configuration settings.
	// Cobra supports persistent flags, which, if defined here,
	// will be global for your application.

	// rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.section.yaml)")

	// Cobra also supports local flags, which will only run
	// when this action is called directly.
	// rootCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
